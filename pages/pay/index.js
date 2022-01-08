import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Head from "next/head";
import Router from "next/router";
import { useSession } from "next-auth/client";
import { toast, ToastContainer } from "react-nextjs-toast";
import Link from "next/link";

export default function Register() {
  const [session] = useSession();

  // form validation rules
  const validationSchema = Yup.object().shape({
    pmtName: Yup.string().required("Your First and Lastname are required"),
    amount: Yup.string().required("Donation amount is required"),
    currencyType: Yup.string().required("Currency type is required"),
    methodOfPayment: Yup.string().required("Method of payment is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data, e) => {
    e.preventDefault();
    toast.notify(`Payment is processing!`);

    const response = await fetch("/api/pay/newpayment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const added = await response.json();
    console.log("JSON reply: ", added);
    const pmtid = added.id;

    // GET THE PAYMENT ID

    const paymentId = pmtid;
    const ownerId = added.ownerId;
    const createdBy = added.createdBy;
    const amount = added.amount;
    const notes = added.notes;

    //
    let theData = {
      ownerId,
      paymentId,
      amount,
      notes,
      createdBy,
    };

    await fetch(`/api/pay/newpoints`, {
      method: "POST",
      body: JSON.stringify(theData),
    });

    toast.remove();
    return await Router.push(`/profile/${ownerId}`);
  };

  if (!session) return <h1 className="py-10 px-20 text-3xl">Not Signed In!</h1>;
  <div className="page-nav">
    <p>&nbsp;</p>
  </div>;

  return (
    <div>
      <Head>
        <title>Donation Form - PVAR</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        <div className="sm:w-1/2 md:1/2 w-full flex-shrink flex-grow-0 p-10">
          <h1>PVAR Donation Test Form</h1>
          <p>No money is charged - testing only</p>
          <p>&nbsp;</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>&nbsp;</p>
              <div>
                <input
                  name="ownerId"
                  type="hidden"
                  {...register("ownerId")}
                  value={session.user.uid}
                />
                <input
                  name="createdBy"
                  type="hidden"
                  {...register("createdBy")}
                  value={session.user.uid}
                />
              </div>
              <div>
                <label>First and Last Name</label>
                <br />
                <input
                  name="pmtName"
                  placeholder="First and Last Name"
                  type="text"
                  {...register("pmtName")}
                  className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.pmtName ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">
                  {errors.pmtName?.message}
                </div>
              </div>
              <p>&nbsp;</p>
              <div>
                <label>Amount</label>
                <br />
                <input
                  name="amount"
                  placeholder="$$ Amount of Donation"
                  type="text"
                  {...register("amount")}
                  className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.amount ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.amount?.message}</div>
              </div>
            </div>
            <div>
              <p>&nbsp;</p>
              <div>
                <label>Currency Type</label>
                <br />
                <input
                  name="currencyType"
                  placeholder="Currency Type - USD, EUR, etc"
                  type="text"
                  {...register("currencyType")}
                  className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.currencyType ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">
                  {errors.currencyType?.message}
                </div>
              </div>
            </div>
            <div>
              <p>&nbsp;</p>
              <div>
                <label>Method of Payment</label>
                <br />
                <input
                  name="methodOfPayment"
                  placeholder="Credit Card, PayPal, etc"
                  type="text"
                  {...register("methodOfPayment")}
                  className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.methodOfPayment ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">
                  {errors.methodOfPayment?.message}
                </div>
              </div>
            </div>

            <div>
              <p>&nbsp;</p>
              <div>
                <label>Notes</label>
                <br />
                <input
                  name="notes"
                  placeholder="Notes"
                  type="textarea"
                  cols="40"
                  rows="5"
                  {...register("notes")}
                  className={`form-control 
                shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.notes ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.notes?.message}</div>
              </div>
            </div>

            <p>&nbsp;</p>
            <ToastContainer />
            <p>&nbsp;</p>
            <div>
              {session && (
                <button
                  type="submit"
                  className="font-bold mt-4 bg-green-500 text-white rounded p-4 shadow-lg"
                >
                  Send Donation Now
                </button>
              )}
              {!session && (
                <p>
                  <b>You must be logged in to send a payment!</b>
                </p>
              )}
              <p>&nbsp;</p>
              <p>&nbsp;</p>

              <button type="button" onClick={() => reset()}>
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="sm:w-1/2 md:1/2 w-full flex-shrink flex-grow-0 p-10">
          <h1>Three Ways to Donate</h1>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <ul>
            <li>
              <b>Credit Card</b>
              <br />
              We use Stripe to process your credit card payments.
              <p>&nbsp;</p>
            </li>
            <li>
              <b>PayPal</b>
              <br />
              <p>&nbsp;</p>
            </li>
            <li>
              <b>Bitcoin or Ethereum (Cryptocurrency)</b>
              <br />
              * Bitcoin will use the Lightning Network to send your payment.
              <br />
              * Ethereum will use the Ropsten Test Network to send your payment.
              <br />
              * You will need a wallet like MetaMask for Ethereum.
              <br />
              * You will need a wallet like Strike for Bitcoin on the Lightning
              Network.
              <br />
              * Ready to go with Crypto?
              <br />* Click here to donate with Ethereum!
              <Link href={`/pay/ethDonate/${session.user.uid}`}>
                * Click here to donate with Ethereum!
              </Link>
              <br />
              <p>&nbsp;</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
