import {
  createLamination,
  deleteLamination,
  getLaminations,
  updateLamination,
} from "@/services/laminationService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const laminations = await getLaminations();
    return NextResponse.json(laminations);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch paper sheets: ${error.message}` },
      { status: 500 }
    );
  }
}
export async function POST() {
  try {
    const lamination = await createLamination();
    return NextResponse.json(lamination);
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
    const updatedLamination = await updateLamination(id, name, price);
    return NextResponse.json(updatedLamination);
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
    const deletedLamination = await deleteLamination(id);
    return NextResponse.json(deletedLamination);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete paper sheet: ${error.message}` },
      { status: 500 }
    );
  }
}
