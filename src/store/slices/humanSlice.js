import { createSlice, nanoid } from "@reduxjs/toolkit";
import humans from "../../mock/humans";

const initialState = {
  humans,
};

const humansSlice = createSlice({
  name: "humansSlice",
  initialState,
  reducers: {
    selectHuman(state, action) {
      const id = action.payload;
      const index = state.humans.findIndex((company) => company.id === id);
      state.humans[index].isActive = !state.humans[index].isActive;
    },
    addHuman: (state, action) => {
      const index = state.humans.length + 1;
      const selectCompanyIds = action.payload;

      const humanDraft = {
        id: nanoid(),
        surname: `Фамилия ${index}`,
        name: `Имя ${index}`,
        position: `Должность ${index}`,
        isEdit: false,
        isActive: false,
        companyId: selectCompanyIds[0],
      };

      state.humans.push(humanDraft);
    },
    removeHuman: (state, action) => {
      const removeIds = state.humans
        .filter((human) => human.isActive)
        .map((human) => human.id);

      state.humans = state.humans.filter(
        (human) => !removeIds.includes(human.id)
      );
    },
    deselectAll(state) {
      humans.every((company) => company.isActive === true)
        ? state.humans.map((company) => (company.isActive = false))
        : state.humans.map((company) => (company.isActive = true));
    },
    reselectAllHumans(state, action) {
      const isAllHumansSelected = action.payload;
      isAllHumansSelected
        ? state.humans.forEach((human) => (human.isActive = false))
        : state.humans.forEach((human) => (human.isActive = true));
    },
    editHuman: (state, action) => {
      const id = action.payload.id;
      const index = state.humans.findIndex((human) => human.id === id);
      const columnIndex = action.payload.columnName;

      if (columnIndex === 0) {
        state.humans[index].surname = action.payload.e;
      } else if (columnIndex === 1) {
        state.humans[index].name = action.payload.e;
      } else if (columnIndex === 2) {
        state.humans[index].position = action.payload.e;
      }
    },
  },
});

export const {
  addHuman,
  removeHuman,
  selectHuman,
  deselectAll,
  reselectAllHumans,
  editHuman,
} = humansSlice.actions;

export default humansSlice.reducer;
