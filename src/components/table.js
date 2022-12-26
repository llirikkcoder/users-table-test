import React from "react";

function Table({
  type,
  title,
  columns,
  rows,
  onSelect,
  addItem,
  deleteItem,
  onSelectAll,
  activeIds,
  onEdit,
  companyHumansCount,
  activeCompanies
}) {
  const isDisabledDeleteBtn = !rows.some((row) => row.isActive);

  return (
    <>
      <h3 className="title">{title}</h3>
      <table>
        <thead>
          <tr>
            <th colSpan="3">Выделить всё</th>
            <th>
              <input
                type="checkbox"
                checked={rows.every((row) => row.isActive)}
                onChange={() => onSelectAll()}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((column, key) => (
              <th key={key}>{column}</th>
            ))}
          </tr>

          {rows.map((row, trKey) => {
            const { id, isEdit, isActive, companyId, ...props } = row;
            const isDisabled = typeof value === "number";
            return (
              <tr className={isActive ? "selected" : ""} key={trKey}>
                {Object.values(props).map((value, tdKey) => (
                (tdKey === 1 && type === "companies") ? 
                  <td key={tdKey} align="center">
                    <input
                      value={companyHumansCount(id)}
                      name={value}
                      disabled={false}
                      style={{
                        border: "none",
                      }}
                    />
                  </td>
                 : 
                  <td key={tdKey} align="center">
                    <input
                      value={value}
                      name={value}
                      disabled={isDisabled}
                      onChange={(e) => onEdit(e.target.value, id, tdKey)}
                      style={{
                        border: "none",
                      }}
                    />
                  </td>
                ))} 
                <td align="center">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => onSelect(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => addItem()} disabled={activeCompanies() && type === "humans"}>Добавить</button> 
      <button onClick={() => deleteItem()} disabled={isDisabledDeleteBtn}>
        Удалить
      </button>
    </>
  );
}

export default Table;
