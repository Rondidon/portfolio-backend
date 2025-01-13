const corsOptions = {
  origin: ["https://www.robincodes.io", "https://localhost:3000"], // allowed domains (frontend)
  methods: "POST", // allowed http methods
  allowedHeaders: "Content-Type",
  optionsSuccessStatus: 200, // manually sets success status to 200 for legacy browsers
};

export default corsOptions;
