import React, { useState } from 'react';

export const  Table = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [checkboxes, setCheckboxes] = useState(new Array(10).fill(false)); // Инициализация массива чекбоксов

    const handleSelectAll = () => {
        const newCheckboxes = checkboxes.map(() => !selectAll);
        setCheckboxes(newCheckboxes);
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
        setSelectAll(newCheckboxes.every((checkbox) => checkbox));
    };

    const handleAddRow = () => {
        setCheckboxes([...checkboxes, false]);
    };

    return (
        <table>
            <thead>
            <tr>
                {/* Заголовок-чекбокс для выбора всех */}
                <th>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                </th>
                <th>Столбец 1</th>
                <th>Столбец 2</th>
                <th>Столбец 3</th>
                <th>Столбец 4</th>
                <th>Столбец 5</th>
                <th>Столбец 6</th>
                <th>Столбец 7</th>
                <th>Столбец 8</th>
                <th>Столбец 9</th>
                <th>Столбец 10</th>
            </tr>
            </thead>
            <tbody>
            {/* Строка с кнопкой "Добавить" */}
            <tr>
                <td colSpan="11">
                    <button onClick={handleAddRow}>Добавить</button>
                </td>
            </tr>
            {/* Остальные строки */}
            {checkboxes.map((checked, index) => (
                <tr key={index + 1}>
                    <td>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheckboxChange(index)}
                        />
                    </td>
                    <td>Ячейка {index + 1},1</td>
                    <td>Ячейка {index + 1},2</td>
                    <td>Ячейка {index + 1},3</td>
                    <td>Ячейка {index + 1},4</td>
                    <td>Ячейка {index + 1},5</td>
                    <td>Ячейка {index + 1},6</td>
                    <td>Ячейка {index + 1},7</td>
                    <td>Ячейка {index + 1},8</td>
                    <td>Ячейка {index + 1},9</td>
                    <td>Ячейка {index + 1},10</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}


