import { NextResponse } from 'next/server';
import { createProposal, getProposals,deleteProposal } from '@/services/proposalService';

export async function POST(request) {
     const data = await request.json();
  try {
   
    const proposal = await createProposal(data);
       console.log(data)
    return NextResponse.json(proposal, { status: 201 });
     

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const proposals = await getProposals();
    return NextResponse.json(proposals);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request){
  const {id} = await request.json();
  try{
    const proposal = await deleteProposal(id)
    return NextResponse.json(proposal,{status:200})
  }
  catch(error){
    return NextResponse.json({error:error.message},{status:500});
  }
}
