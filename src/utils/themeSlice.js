import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: "pastel",
	reducers: {
		toggleTheme: (state) => (state === "pastel" ? "dark" : "pastel"),
	},
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
