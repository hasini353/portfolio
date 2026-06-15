const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class LocalCollection {
  constructor(collectionName) {
    this.filePath = path.join(DATA_DIR, `${collectionName.toLowerCase()}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
    }
  }

  async read() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async write(data) {
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async find(filter = {}) {
    const items = await this.read();
    return items.filter(item => {
      for (const key in filter) {
        // Simple filter check
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(filter = {}) {
    const items = await this.find(filter);
    return items[0] || null;
  }

  async findById(id) {
    const items = await this.read();
    return items.find(item => item._id === id || String(item._id) === String(id)) || null;
  }

  async create(data) {
    const items = await this.read();
    const newItem = {
      _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      ...data
    };
    items.push(newItem);
    await this.write(items);
    return newItem;
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const items = await this.read();
    const index = items.findIndex(item => item._id === id || String(item._id) === String(id));
    if (index === -1) return null;

    // Apply update (handle Mongoose style $inc, etc. simply, or direct object update)
    let updatedItem = { ...items[index] };
    if (update.$inc) {
      for (const field in update.$inc) {
        updatedItem[field] = (updatedItem[field] || 0) + update.$inc[field];
      }
      delete update.$inc;
    }
    
    // Direct fields
    updatedItem = { ...updatedItem, ...update };
    items[index] = updatedItem;
    await this.write(items);
    return updatedItem;
  }

  async findByIdAndDelete(id) {
    const items = await this.read();
    const index = items.findIndex(item => item._id === id || String(item._id) === String(id));
    if (index === -1) return null;
    const deleted = items.splice(index, 1)[0];
    await this.write(items);
    return deleted;
  }

  async countDocuments(filter = {}) {
    const items = await this.find(filter);
    return items.length;
  }
}

const collections = {};

function getLocalCollection(name) {
  if (!collections[name]) {
    collections[name] = new LocalCollection(name);
  }
  return collections[name];
}

module.exports = { getLocalCollection };
