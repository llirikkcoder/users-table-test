import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "./components/table";
import {
  selectCompany,
  addCompany,
  removeCompany,
  reselectAllCompanies,
  activeIds,
  editCompany,
} from "./store/slices/companySlice";
import {
  selectHuman,
  addHuman,
  removeHuman,
  reselectAllHumans,
  editHuman,
} from "./store/slices/humanSlice";

import "./styles.css";

const companyTableColumns = [
  "Компания",
  "Кол-во сотрудников",
  "Адрес",
  "Чекбокс",
];

const humansTableColumns = ["Фамилия", "Имя", "Должность", "Чекбокс"];

function App() {
  const { companies } = useSelector((state) => state.companies);
  const { humans } = useSelector((state) => state.humans);

  const [checkedCompaniesId, setChecked] = useState([]);
  const [checkedHumansIds, setHumanChecked] = useState([]);

  const dispatch = useDispatch();

  const selectAllCompanies = () => {
    setChecked(
      checkedCompaniesId.length !== companies.length
        ? companies.map((company) => company.id)
        : []
    );
    const isAllCompanySelected = checkedCompaniesId.length === companies.length;
    dispatch(reselectAllCompanies(isAllCompanySelected));
  };

  const selectAllHumans = () => {
    setHumanChecked(
      checkedHumansIds.length !== humans.length
        ? humans.map((human) => human.id)
        : []
    );
    const isAllHumansSelected = checkedHumansIds.length === humans.length;
    dispatch(reselectAllHumans(isAllHumansSelected));
  };

  const onSelectCompanyHandler = (id) => {
    console.log("id:", id)
    dispatch(selectCompany(id));
  };

  const humansCountById = (test_id) => {
    let count = 0;
    for (let human of humans) {
      if (test_id === human.companyId) {
        count = count + 1;
      }
    }
    return count;
  };

  const activeCompaniesIds = companies
    .filter((company) => company.isActive)
    .map((company) => company.id);

  const humansList = humans.filter((human) =>
    activeCompaniesIds.includes(human.companyId)
  );

  const isHumanTableVisible = !!activeCompaniesIds.length;

  function activeCompanies() {
    return (
      companies
        .filter((company) => company.isActive)
        .map((company) => company.id).length >= 2
    );
  }

  return (
    <div>
      <h2 className="app-title">Список компаний</h2>
      <div className="dashboard">
        <div className="dashboard__column">
          <Table
            type="companies"
            title="Компании"
            columns={companyTableColumns}
            rows={companies}
            onSelect={(e) => onSelectCompanyHandler(e)}
            addItem={() => dispatch(addCompany())}
            deleteItem={() => dispatch(removeCompany())}
            onSelectAll={() => selectAllCompanies()}
            onEdit={(e, id, columnName) =>
              dispatch(editCompany({ e, id, columnName }))
            }
            activeIds={() => dispatch(activeIds())}
            companyHumansCount={(id) => humansCountById(id)}
            activeCompanies={activeCompanies}
          />
        </div>
        {isHumanTableVisible && (
          <div className="dashboard__column">
            <Table
              type="humans"
              title="Сотрудники"
              columns={humansTableColumns}
              rows={humansList}
              onSelect={(e) => dispatch(selectHuman(e))}
              addItem={() => dispatch(addHuman(activeCompaniesIds))}
              deleteItem={() => dispatch(removeHuman())}
              onSelectAll={() => selectAllHumans()}
              activeIds={() => dispatch(activeIds())}
              onEdit={(e, id, columnName) =>
                dispatch(editHuman({ e, id, columnName }))
              }
              activeCompanies={activeCompanies}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
