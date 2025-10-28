import client from '@/lib/libsqlClient';

export async function createProposal(data) {
  // Basic validation (add more as needed)
  if (!data.name || !data.selectedPaper || !data.lamination) {
    throw new Error('Missing required fields');
  }

  const sql = `INSERT INTO Proposal (
    name, bladeWidth, bladeLength, machineRatio, numOfPieces,
    selectedPaper, paperSheetPriceAtProposal, printingPrice,
    laminationPriceAtProposal, lamination, cuttingPrice, gluingPrice,
    bladePrice, shipping, subTotal, total, createdAt
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  RETURNING *;`;

  const args = [
    data.name,
    Number(data.bladeWidth || 0),
    Number(data.bladeLength || 0),
    Number(data.machineRatio || 0),
    Number(data.numOfPieces || 0),
    Number(data.selectedPaper),
    data.paperSheetPriceAtProposal == null ? null : Number(data.paperSheetPriceAtProposal),
    Number(data.printingPrice || 0),
    data.laminationPriceAtProposal == null ? null : Number(data.laminationPriceAtProposal),
    Number(data.lamination),
    Number(data.cuttingPrice || 0),
    Number(data.gluingPrice || 0),
    Number(data.bladePrice || 0),
    Number(data.shipping || 0),
    Number(data.subTotal || 0),
    Number(data.total || 0),
    data.createdAt || Date.now(),
  ];

  const res = await client.execute(sql, args );
  // res.rows[0] is the created proposal
  return res.rows[0];
}

export async function getProposals() {
  const sql = `SELECT p.*, 
    ps.id AS paper_id, ps.name AS paper_name, ps.price AS paper_price,
    l.id AS lamination_id, l.name AS lamination_name, l.price AS lamination_price
    FROM Proposal p
    LEFT JOIN PaperSheets ps ON ps.id = p.selectedPaper
    LEFT JOIN Laminations l ON l.id = p.lamination
    ORDER BY p.id DESC;`;

  const res = await client.execute(sql);
  // Map rows to include nested paperSheet and laminationObj like Prisma include
  return res.rows.map((row) => {
    const { paper_id, paper_name, paper_price, lamination_id, lamination_name, lamination_price, ...rest } = row;
    return {
      ...rest,
      paperSheet: paper_id
        ? { id: paper_id, name: paper_name, price: paper_price }
        : null,
      laminationObj: lamination_id
        ? { id: lamination_id, name: lamination_name, price: lamination_price }
        : null,
    };
  });
}
export async function deleteProposal(id){
  try{
    const sql = 'DELETE FROM Proposal WHERE id = ? RETURNING id;';
    const args =[id];
    const res = await client.execute(sql,args);
    console.log(res)
    return res.rows[0]
  }
  catch(error){
    console.error('delete proposal service error:', error);
    throw new Error(`Failed to delete proposal: ${error}`)
  }

}