export interface Category {
  name: string;
  account: string;
}

export const CATEGORIES: Category[] = [
  { name: "Hospitality - Guest (Ziafat - Am)", account: "01-01-01" },
  { name: "Hospitality - Tabligh (Ziafat - Tabligh)", account: "01-01-02" },
  { name: "Maintenance - General (Maintenance - Am)", account: "01-02-01" },
  { name: "Maintenance - Office (Maintenance - Office)", account: "01-02-02" },
  { name: "Traveling - Gas & Fuel (Traveling - Gas)", account: "01-03-01" },
  { name: "Traveling - Public Transport (Traveling - Public)", account: "01-03-02" },
  { name: "Communication - Mobile (Communication - Mobile)", account: "01-04-01" },
  { name: "Communication - Internet (Communication - Internet)", account: "01-04-02" },
  { name: "Postage & Couriers (Postage)", account: "01-05-01" },
  { name: "Stationery & Supplies (Stationery)", account: "01-06-01" },
  { name: "Miscellaneous (Miscellaneous)", account: "01-99-01" }
];
