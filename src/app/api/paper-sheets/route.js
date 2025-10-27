import {
  createPaperSheet,
  deletePaperSheet,
  getPaperSheets,
  updatePaperSheet,
} from "@/services/paperSheetService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const papers = await getPaperSheets();
    return NextResponse.json(papers);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch paper sheets: ${error.message}` },
      { status: 500 }
    );
  }
}
export async function POST() {
  try {
    const paper = await createPaperSheet();
    return NextResponse.json(paper);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create paper sheet: ${error.message}` },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  try {
    const { id, name, price } = await req.json();
    const updatedPaper = await updatePaperSheet(id, name, price);
    return NextResponse.json(updatedPaper);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update paper sheet:${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deletedPaper = await deletePaperSheet(id);
    return NextResponse.json(deletedPaper);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete paper sheet: ${error.message}` },
      { status: 500 }
    );
  }
}

// export async function PUT(req) {
//   const { id, name, price } = await req.json();

//   console.log("UPDATING:", id, name, price);
//   const updatedSheet = await prisma.paperSheets.update({
//     where: {
//       id,
//     },
//     data: {
//       name,
//       price:Number(price),
//     },
//   });
//   return new Response(JSON.stringify(updatedSheet), { status: 200 });
// }

// export async function DELETE(req) {
//   const { id } = await req.json();
//   console.log("Deleting", id);
//   const deletedSheet = await prisma.paperSheets.delete({
//     where: {
//       id,
//     },
//   });
//   return new Response(JSON.stringify(deletedSheet), { status: 200 });
// }
