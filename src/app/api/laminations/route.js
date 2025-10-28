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
export async function POST(req) {
  try {
    const body = await req.json();
    console.log('POST /api/laminations body=', body);
    const { name, price } = body || {};
    if (typeof name === 'undefined' || typeof price === 'undefined') {
      return NextResponse.json({ error: 'Missing name or price in request body' }, { status: 400 });
    }
    const lamination = await createLamination(name, price);
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
    const body = await req.json();
    console.log('DELETE /api/laminations body=', body);
    const { id } = body || {};
    if (typeof id === 'undefined') {
      return NextResponse.json({ error: 'Missing id in request body' }, { status: 400 });
    }
    const deletedLamination = await deleteLamination(id);
    return NextResponse.json(deletedLamination);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete paper sheet: ${error.message}` },
      { status: 500 }
    );
  }
}
