import { createSlice, nanoid } from "@reduxjs/toolkit";
import companies from "./../../mock/companies";

const initialState = {
  companies,
};

const companiesSlice = createSlice({
  name: "companiesSlice",
  initialState,
  reducers: {
    activeIds(state) {
      return state.companies
        .filter((company) => company.isActive)
        .map((company) => company.id);
    },

    selectCompany(state, action) {
      const id = action.payload;
      const index = state.companies.findIndex((company) => company.id === id);
      state.companies[index].isActive = !state.companies[index].isActive;
    },

    reselectAllCompanies(state, action) {
      const isAllCompanySelected = action.payload;
      isAllCompanySelected
        ? state.companies.forEach((company) => (company.isActive = false))
        : state.companies.forEach((company) => (company.isActive = true));
    },
    addCompany: (state) => {
      const index = state.companies.length + 1;

      const companyDraft = {
        id: nanoid(),
        label: `Компания ${index}`,
        humansCount: 0,
        adress: `Адресс компании ${index}`,
        isEdit: false,
        isActive: false,
      };

      state.companies.push(companyDraft);
    },
    removeCompany: (state) => {
      const removeIds = state.companies
        .filter((company) => company.isActive)
        .map((company) => company.id);

      state.companies = state.companies.filter(
        (company) => !removeIds.includes(company.id)
      );
    },
    editCompany: (state, action) => {
      console.log("action.payload", action.payload)

      const id = action.payload.id;
      const index = state.companies.findIndex((company) => company.id === id);
      const columnIndex = action.payload.columnName;

      if (columnIndex === 0) {
        state.companies[index].label = action.payload.e;
      } else if (columnIndex === 2) {
        state.companies[index].adress = action.payload.e;
      }
    },
  },
});

export const {
  addCompany,
  removeCompany,
  selectCompany,
  reselectAllCompanies,
  activeIds,
  editCompany,
} = companiesSlice.actions;

export default companiesSlice.reducer;
