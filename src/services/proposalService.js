import { prisma } from '@/lib/prisma';

export async function createProposal(data) {
  // Basic validation (add more as needed)
  if (!data.name || !data.selectedPaper || !data.lamination) {
    throw new Error('Missing required fields');
  }
  return await prisma.proposal.create({
    data: {
      name: data.name,
      bladeWidth: data.bladeWidth,
      bladeLength: data.bladeLength,
      machineRatio: data.machineRatio,
      numOfPieces: data.numOfPieces,
      selectedPaper: data.selectedPaper,
      paperSheetPriceAtProposal: data.paperSheetPriceAtProposal,
      printingPrice: data.printingPrice,
      laminationPriceAtProposal: data.laminationPriceAtProposal,
      lamination: data.lamination,
      cuttingPrice: data.cuttingPrice,
      gluingPrice: data.gluingPrice,
      bladePrice: data.bladePrice,
      shipping: data.shipping,
      subTotal:data.subTotal,
      total:data.total,
    },
    include: {
      paperSheet: true,
      laminationObj: true,
    },
  });
}

export async function getProposals() {
  return await prisma.proposal.findMany({
    include: {
      paperSheet: true,
      laminationObj: true,
    },
    orderBy: { id: 'desc' },
  });
}