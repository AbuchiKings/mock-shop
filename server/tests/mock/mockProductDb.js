const allProducts = {
  command: 'SELECT',
  rowCount: 16,
  oid: null,
  rows:
    [{
      product_id: 5,
      name: 'Black Router',
      description: 'Lorem ipsum dolor sit amerd',
      category: 'clothes',
      price: 10.01,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 6,
      name: 'Yellow Router',
      description: 'Lorem ipsum dolor sit amerd',
      category: 'clothes',
      price: 10.01,
      image_url: 'http://example.com/photo.jpg',
      in_stock: false
    },
    {
      product_id: 8,
      name: 'Router',
      description: 'Lorem ipsum dolor sit amerd',
      category: 'clothes',
      price: 10.01,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 10,
      name: 'Daughter of the empire',
      description: 'lorem ipsum dolor sit aned',
      category: 'eBooks',
      price: 10.57,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 11,
      name: 'Dr. Zhivago',
      description: 'lorem ipsum dolor sit aned',
      category: 'eBooks',
      price: 10.57,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 14,
      name: 'Samsung Galaxy s10',
      description: 'lorem ipsum dolor sit aned',
      category: 'Electronics',
      price: 340.57,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 15,
      name: 'LG G2',
      description: 'One of the best phones ever',
      category: 'Electronics',
      price: 500.99,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 16,
      name: 'Iphone 11 PRO',
      description: 'One of the best phones ever',
      category: 'Electronics',
      price: 745.99,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 17,
      name: 'Airmax',
      description: 'lorem ipsum dolor sit ametr',
      category: 'Clothes',
      price: 15,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 18,
      name: 'Baron De Vals',
      description: 'lorem ipsum dolor sit ametr',
      category: 'Food & Drinks',
      price: 155,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 19,
      name: 'Baron De Montesque',
      description: 'lorem ipsum dolor sit ametr',
      category: 'Food & Drinks',
      price: 123.04,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 20,
      name: 'Patek Milli',
      description: 'lorem ipsum dolor sit ametr',
      category: 'Jewelry',
      price: 195.4,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 21,
      name: '   ',
      description: 'lorem ipsum dolor sit ametr',
      category: 'Jewelry',
      price: 195.4,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 22,
      name: 'Lego',
      description: 'lorem ipsum dolor sit ametr',
      category: '    ',
      price: 195.4,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 12,
      name: 'The Wheel of time',
      description: 'lorem ipsum dolor sit ametr',
      category: 'Jewelry',
      price: 195.4,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    },
    {
      product_id: 13,
      name: 'Cristian Gilbanks',
      description: 'lorem ipsum dolor sit ametr',
      category: 'ebook',
      price: 195.4,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    }],
  fields: []
};

const product = {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows:
    [{
      product_id: 13,
      name: 'Cristian Gilbanks',
      description: 'lorem ipsum dolor sit ametr',
      category: 'ebook',
      price: 195.4,
      image_url: 'http://example.com/photo.jpg',
      in_stock: true
    }],
  fields: []
};

const nonexistingProduct = {
  command: 'SELECT',
  rowCount: 0,
  oid: null,
  rows:
    [],
  fields: []
};

export default { product, allProducts, nonexistingProduct };
