export const initialCheckboxData = [
  {
    id: 1,
    checked: false,
    name: "Electronics",
    children: [
      {
        id: 2,
        checked: false,
        name: "Mobiles",
        children: [
          {
            id: 3,
            checked: false,
            name: "Iphone 13",
          },
          {
            id: 4,
            checked: false,
            name: "Google Pixel 9",
          },
        ],
      },
      {
        id: 5,
        checked: false,
        name: "Laptops",
        children: [
          {
            id: 6,
            checked: false,
            name: "Macbook Pro",
          },
          {
            id: 7,
            checked: false,
            name: "Lenovo Legion 5 Pro",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    checked: false,
    name: "Accessories",
    children: [
      {
        id: 9,
        checked: false,
        name: "Watches",
        children: [
          {
            id: 10,
            checked: false,
            name: "Apple Watch",
          },
          {
            id: 11,
            checked: false,
            name: "G-Schock Mudmaster",
          },
        ],
      },
      {
        id: 12,
        checked: false,
        name: "Lenskart Sunglasses",
      },
    ],
  },
];
export const fileFolderDummyData = [
  {
    id: 1,
    name: "src",
    isFolder: true,
    isExpanded: true,
    children: [
      { id: 2, name: "index.js" },
      { id: 3, name: "styles.css" },
      {
        id: 4,
        name: "components",
        isFolder: true,
        children: [{ id: 5, name: "MyInput.tsx" }],
        isExpanded: false,
      },
    ],
  },
  {
    id: 6,
    name: "public",
    isFolder: true,
    isExpanded: false,
    children: [
      { id: 7, name: "index.html" },
      {
        id: 8,
        name: "assets",
        isFolder: true,
        children: [{ id: 9, name: "image1.png" }],
        isExpanded: false,
      },
    ],
  },
];
