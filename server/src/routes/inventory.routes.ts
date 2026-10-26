import { Router, type Request, type Response } from 'express';

const router = Router();

// Mock inventory data
const inventoryItems = [
  { id: 1, name: 'Wireless Mouse', stock: 45 },
  { id: 2, name: 'Mechanical Keyboard', stock: 12 },
];

// GET /api/inventory
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: inventoryItems,
  });
});

// POST /api/inventory
router.post('/', (req: Request, res: Response) => {
  const { name, stock } = req.body;

  if (!name || stock === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Name and stock are required fields',
    });
  }

  const newItem = {
    id: inventoryItems.length + 1,
    name,
    stock: Number(stock),
  };

  inventoryItems.push(newItem);

  res.status(201).json({
    status: 'success',
    message: 'Item added successfully',
    data: newItem,
  });
});

export default router;
