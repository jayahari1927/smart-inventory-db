//use logistics_db;

// Insert mock data for stock tracking
db.inventory.insertMany([
  { item_id: 101, sku: "SKU-APPLE-12", warehouse_id: "WH-EAST", status: "instock", stock_level: 500 },
  { item_id: 102, sku: "SKU-SAMSG-99", warehouse_id: "WH-WEST", status: "low_stock", stock_level: 15 },
  { item_id: 103, sku: "SKU-DELL-555", warehouse_id: "WH-EAST", status: "out_of_stock", stock_level: 0 },
  { item_id: 104, sku: "SKU-LOGI-888", warehouse_id: "WH-NORTH", status: "instock", stock_level: 1200 }
]);

// 1. Analyze performance BEFORE indexing
print("--- Unindexed Performance Analysis ---");
printjson(db.inventory.find({ warehouse_id: "WH-EAST", status: "instock" }).explain("executionStats").executionStats);

// 2. Create optimized compound index
db.inventory.createIndex({ warehouse_id: 1, status: 1 });

// 3. Analyze performance AFTER indexing
print("--- Indexed Performance Analysis ---");
printjson(db.inventory.find({ warehouse_id: "WH-EAST", status: "instock" }).explain("executionStats").executionStats);
