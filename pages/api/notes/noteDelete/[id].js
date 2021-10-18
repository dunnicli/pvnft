import prisma from '../../../../lib/prisma.ts';

// DELETE /api/notes/noteDelete/:id
export default async function handle(req, res) {
  const noteId = req.query.id;
  if (req.method === 'DELETE') {
    const note = await prisma.note.delete({
      where: { id: Number(noteId) },
    });
    res.json(note);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
