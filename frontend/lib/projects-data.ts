export type ProjectTag = {
  label: string;
  tone: "premium" | "eco" | "commercial" | "default";
};

export type ProjectCard = {
  id: string;
  name: string;
  location: string;
  inquiries: number;
  imageUrl: string;
  imageAlt: string;
  size: "anchor" | "portrait" | "square";
  tag?: ProjectTag;
  salesExecs?: number;
  category: "metro-manila" | "cavite" | "laguna" | "cebu";

  // Detailed fields
  houseModel?: string;
  houseType?: string;
  constructionStatus?: string;
  developer?: string;
  exactLocation?: string;
  commission?: string;
  priority?: string;
  priceRange?: string;
  tcp?: string;
  reservationFee?: string;
  requiredSalary?: string;
  dpOption?: string;
  driveLink?: string;
  images?: string[];
};

export const projects: ProjectCard[] = [
  {
    id: "idesia-dasmarinas",
    name: "Idesia Dasmariñas",
    location: "Dasmariñas, Cavite",
    inquiries: 142,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1OcRfucn2zA9U8jqahihXviks4q7YX1Ova2bCyNhvOiJxYSt1nv5-vZxNoPHfPflL7N9lcNZyWe3UG0lcLlGs9IWti2jfVl_pwLhUMv9a3LNCaWcOSj9ZxGZT9Ppkjg_5NMRQSSrS_r78m5VPRjlci0EU78oLAsCXXfpNnt8dA741tOn7OIBQ5VuPFuUjqpQXu1HSJTfWuqoV2pFBwvdZytpU9Yl1LwAcZPyDZd-1HGjoUGuWrbvEcS05gHXix7rIwFyOPsBWG60",
    imageAlt: "Modern high-rise residential skyscraper with sleek glass facade reflecting a vivid sunset in a tropical metropolitan skyline",
    size: "anchor",
    tag: { label: "PREMIUM", tone: "premium" },
    category: "cavite",
    houseModel: "Not specified",
    houseType: "Not specified",
    constructionStatus: "Preselling",
    developer: "P.A Properties",
    exactLocation: "Governor’s Drive Brgy. San Agustin, Dasmariñas, Cavite",
    commission: "5.00% COMM",
    priority: "High Priority",
    priceRange: "₱3,000,000 - ₱6,631,041",
    tcp: "₱6,631,041",
    reservationFee: "₱30,000",
    requiredSalary: "₱135,706",
    dpOption: "₱82,282 - 8 months",
    driveLink: "https://drive.google.com",
  },
  {
    id: "veridia-estates",
    name: "Veridia Estates",
    location: "Silang, Cavite",
    inquiries: 89,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgd__SwyaxrcTt4U_-jiMrH2uaebJiw2lUF7C3-d0KhLdHP_KfeQK-a8Ge90KUr3-TikxKqY6vWyMbvFEhdti3Esjji0Czrr_hx-IeUDW8_e9nP8CYvgFYoN_2tx75KAFZyWvkOP8K3OQg5sENibYoDmXuG26sGysbY1yK21jgGeTDSIU17Xxaa0FHxg6LOLYiARJqn6C62PEAbJ28ki3zAmmEJIuhFcq_6-6wA70UZbrfjYsP7mQBNnswpx4TdZiQEVgtd8G3utg",
    imageAlt: "Minimalist modern luxury villa in Cavite with clean white lines, large glass windows, and manicured tropical landscaping",
    size: "portrait",
    category: "cavite",
  },
  {
    id: "veridia-estates",
    name: "Veridia Estates",
    location: "Silang, Cavite",
    inquiries: 89,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgd__SwyaxrcTt4U_-jiMrH2uaebJiw2lUF7C3-d0KhLdHP_KfeQK-a8Ge90KUr3-TikxKqY6vWyMbvFEhdti3Esjji0Czrr_hx-IeUDW8_e9nP8CYvgFYoN_2tx75KAFZyWvkOP8K3OQg5sENibYoDmXuG26sGysbY1yK21jgGeTDSIU17Xxaa0FHxg6LOLYiARJqn6C62PEAbJ28ki3zAmmEJIuhFcq_6-6wA70UZbrfjYsP7mQBNnswpx4TdZiQEVgtd8G3utg",
    imageAlt:
      "Minimalist modern luxury villa in Cavite with clean white lines, large glass windows, and manicured tropical landscaping",
    size: "portrait",
    tag: { label: "PREMIUM", tone: "premium" },
    category: "cavite",
  },
  {
    id: "solara-coast",
    name: "Solara Coast",
    location: "Mactan, Cebu",
    inquiries: 215,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzE6ZdcYKYCSinz-NkeApIx7Ar5d1nx47g486CPM26KNeGthPmM4QayaerDH6mmywzlOZcfuYfIhbk9i1WOCOmsvMmvasD-naG8IvJweqTkW8k_PM-POB6nCKx9LqcKdD9-PfuaI8SKjWqfmoUpNYITQUINMDNR5h51-t9nEHYLkeNSQTygvzwKVyCBbm333SL5rapQbFyrW6w5tI8QASX-TrKpDeFrC7hWOIXslv5x7_Khi85moWdMKc2nah3Dnera7UKh95vXj4",
    imageAlt:
      "Aerial view of a coastal resort development with turquoise swimming pools and luxury cabanas overlooking the ocean",
    size: "square",
    salesExecs: 12,
    category: "cebu",
  },
  {
    id: "apex-one-tower",
    name: "Apex One Tower",
    location: "Ortigas Center, Pasig",
    inquiries: 56,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCN9fxtD0we9__v57tx8E5M8JjUN5lY4HnewZi_HyFAyujqw1uPxcrvNMCgIfO1_Ze1w_Pdg8CjJrZ-oWcrs3a0DDeAbYk0pxjwnRCjJefDeLo_UX9DvwZGEwTkQG_a6qn-tFIJXaVvF9oyL6-gV9MeHu-YtNmB9ZnZlN5_cb-c_HnlIfzwoiQdE3DN8-wYMPbB8ldVJj8lT7XxgjimV6QcJ9Ml4T0ycTvq8_R9WApBr6Agcul5SWKzRz61_K7QmQc4z_9ebgiLmHM",
    imageAlt:
      "Sleek corporate office building with steel and glass architectural details during blue hour in a business district",
    size: "square",
    tag: { label: "Commercial Grade", tone: "commercial" },
    category: "metro-manila",
  },
  {
    id: "ecogrove-residences",
    name: "EcoGrove Residences",
    location: "Sta. Rosa, Laguna",
    inquiries: 104,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhkZQ0Bp671ETddimNiDy1YqDe21WqZ9UZ1PsY2Vlbu3sDow33xHJDjW3QJHUXY82HFQBHeNIuQaWeHVOA9odl4w5E7_nk7Gy_i8bf-BpM_s23Q2B-IfJcNQVXvB4rV3bHfPxEGQ6_InfoD2VOMwK9769UGJAbNWu6VGO7CT44pSyyzCrXRNkd75yTTdagi-jA5l8GNqsk7d3PyiQrGceU28uzTBxlrvjaFkPv_XBk5f00HO9aZ7fueQGq3UnRTeKPoK6GqgTif3M",
    imageAlt:
      "Lush eco-friendly residential community with vertical gardens and sustainable wood architecture in a forest setting",
    size: "square",
    tag: { label: "LEED Gold", tone: "eco" },
    category: "laguna",
  },
];

export const projectFilters = [
  { label: "All Assets", value: "all" },
  { label: "Metro Manila", value: "metro-manila" },
  { label: "Cavite Clusters", value: "cavite" },
  { label: "Laguna Estates", value: "laguna" },
  { label: "Cebu Hubs", value: "cebu" },
] as const;

export type FilterValue = (typeof projectFilters)[number]["value"];
