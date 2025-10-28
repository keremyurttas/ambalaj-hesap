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
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price } = body || {};
    if (typeof name === 'undefined' || typeof price === 'undefined') {
      return NextResponse.json({ error: 'Missing name or price in request body' }, { status: 400 });
    }
    const paper = await createPaperSheet(name, price);
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
    const body = await req.json();
    const { id } = body || {};
    if (typeof id === 'undefined') {
      return NextResponse.json({ error: 'Missing id in request body' }, { status: 400 });
    }
    const deletedPaper = await deletePaperSheet(id);
    return NextResponse.json(deletedPaper);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete paper sheet: ${error.message}` },
      { status: 500 }
    );
  }
}


