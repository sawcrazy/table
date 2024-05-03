import React,{useState,useEffect}from 'react';
import logoIcon from './img/logo.svg';
import {ButtonFunction} from "./components/button_function";
import blockIcon from './img/block.svg';
import certificateIcon from './img/certificate.svg';
import deleteIcon from './img/delete.svg';
import editIcon from './img/edit.svg';
import viewWeekIcon from './img/view_week.svg';
import viewWeek2Icon from './img/view_week_2.svg';
import expandIcon from './img/expand.svg';
import addIcon from './img/plus.svg'
import {ButtonShow} from "./components/button_show";
import {Modal} from "./components/modal";
import './App.css';
import {ModalDelet} from "./components/ModalDelet";
import {ModalEdit} from "./components/modal-edit";

export const App = () =>{
    const [activeButton, setActiveButton] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [modalEdit, setOpenModalEdit] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [infoTable, setInfoTable] = useState([]);
    const [source, setSource] = useState('');
    const [checked, setChecked] = useState([]);
    const [element, setElement] = useState([]);
    const [data, setData] = useState('');
    const [time, setTime] = useState('');
    const [sourceEdit, setSourceEdit] = useState('');
    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timerID);
    }, []);

    const openModal = () =>{
        setOpenModalAdd(true);
    };
    const openModalDelet = () =>{
        if(checked.length === 0) {
            return;
        }
        setOpenModalDelete(true);
    }
    const closeModal = () =>{
        setOpenModalAdd(false);
    };
    const closeModalDelete = () =>{
        setOpenModalDelete(false)
    }
    const closeModalEdit = () =>{
        setOpenModalEdit(false);
    }
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };
    const onChecked = (id) =>{
        if(checked.includes(id)){
           return  setChecked(checked.filter((item) => item !== id))
        }
        setChecked([...checked,id]);
    }
    const edit = () =>{
        const newElement = infoTable.find(item => item.id === checked[0]);
        if (!newElement){
            return;
        }
        setOpenModalEdit(true);
        setElement(newElement);
        setData(newElement.data);
        setTime(newElement.time);
        setSourceEdit(newElement.source);
        setOpenModalEdit(true);
    }
    const renderTable = () =>{
        return infoTable.map((item)=>{
            return (
                <tr>
                    <td className="first-column">
                        <input checked={checked.includes(item.id)} type="checkbox" className="custom-table-checkbox" onClick={()=>onChecked(item.id)}/>
                    </td>
                    <td>{item.data}</td>
                    <td>{item.time}</td>
                    <td>{item.source}</td>
                    <td>{item.d}</td>
                    <td>{item.e}</td>
                    <td>{item.f}</td>
                    <td>{item.a}</td>
                    <td>{item.u}</td>
                    <td>{item.l}</td>
                </tr>
            )
        })
    }
    const addInfo = () =>{
        const id = new Date().getTime();
        const newAddInfo = [...infoTable];
        const table = {
            id,
            data: currentTime.toLocaleDateString(),
            time: currentTime.toLocaleTimeString(),
            source,
            d: '123321',
            e: '123321',
            f: '123321',
            a: '123321',
            u: '123321',
            l: '123321',
        }
        newAddInfo.push(table);
        setInfoTable(newAddInfo);
        setSource(null);
        setOpenModalAdd(false);
    };
    const sourceValue = (value) =>{
        setSource(value);
    }
    const deleteInfo = () =>{

        const del = infoTable.filter((item) => !checked.includes(item.id));
        setInfoTable(del);
        setOpenModalDelete(false);
        setChecked([]);
    }
    const save = ()=>{
        const newInfoTable = infoTable.map((item) => {
            if(item.id === checked[0]){
                return {
                    ...item,
                    data,
                    time,
                    source: sourceEdit,
                }
            }
            return item
        })
        setInfoTable(newInfoTable);
        setOpenModalEdit(false);

    }
    return (
        <div className="main">
            <div className="container">
                <div className="header">
                    <div className="header_logo">
                        <img src={logoIcon} alt="logo"/>
                    </div>
                    <div className="header_name">
                        РТСН\НН-2
                    </div>
                </div>
                <div className="buttons">
                    <div className="buttons_function">
                        <ButtonFunction name="Проверить" img={certificateIcon}/>
                        <ButtonFunction name="Отменить проверку" img={blockIcon}/>
                        <ButtonFunction name="Редактировать" img={editIcon} onClick={edit}/>
                        <ButtonFunction name="Удалить" img={deleteIcon} onClick={openModalDelet}/>
                    </div>
                    <div className="buttons_show">
                        <div className="buttons_show_position">
                            <div>
                                <ButtonShow
                                    img={viewWeekIcon}
                                    id="1"
                                    active={activeButton === '1'}
                                    onClick={handleButtonClick}
                                />
                            </div>
                            <div>
                                <ButtonShow
                                    img={viewWeek2Icon}
                                    id="2"
                                    active={activeButton === '2'}
                                    onClick={handleButtonClick}
                                />
                            </div>
                        </div>
                        <div className="buttons_show_fullscreen">
                            <ButtonShow
                                img={expandIcon}
                                id="3"
                                active={activeButton === '3'}
                                onClick={handleButtonClick}
                            />
                        </div>
                    </div>
                </div>
                <div className="info">
                    <div className="info_text">
                       <span>Нет</span>  проверенных замеров
                    </div>
                    <div className="info_switch">
                        <div>
                            <label className="switch">
                                <input type="checkbox" />
                                    <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="info_switch_text">
                            Группировать по дате
                        </div>
                        <div>
                        </div>
                    </div>
                </div>

                <div className="table">
                    <table className="custom-table">
                        <thead>
                        <tr>
                            <th className="first-column">
                                <input className="custom-table-checkbox" type="checkbox"/>
                            </th>
                            <th>Дата</th>
                            <th>Время</th>
                            <th>Источник</th>
                            <th>Фаза</th>
                            <th>U, kB</th>
                            <th>I, A</th>
                            <th>P, MBt</th>
                            <th>Q, Mвар</th>
                            <th>cos φ</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="first-column">
                                <button className="table-button-add" onClick={openModal}>
                                    <img src={addIcon} alt=""/>
                                </button>
                            </td>
                            <td colSpan="10" className="second-column">
                                Добавить новые замеры
                            </td>
                        </tr>
                        {renderTable()}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                open={openModalAdd}
                closeModal={closeModal}
                addInfo={addInfo}
                nameButton='Добавить'
            >
                <div>
                   Дата <input className="modal-input" type="text" value={currentTime.toLocaleDateString()}/>
                </div>
                <div>
                   Время <input className="modal-input" type="text" value={currentTime.toLocaleTimeString()}/>
                </div>
                <div>
                  Источник  <input className="modal-input" type="text" placeholder="Введите источник" onChange={(e)=>sourceValue(e.target.value)}/>
                </div>
                <div>
                    Фаза <input className="modal-input" type="text" value="123123"/>
                </div>
                <div>
                    U, kB <input className="modal-input" type="text" value="123123"/>
                </div>
                <div>
                    I, A <input className="modal-input" type="text" value="123123"/>
                </div>
                <div>
                    P, MBt <input className="modal-input" type="text" value="123123"/>
                </div>
                <div>
                    Q, Mвар <input className="modal-input" type="text" value="123123"/>
                </div>
                <div>
                    cos φ <input className="modal-input" type="text" value="123123"/>
                </div>

            </Modal>
            <ModalDelet
                open={openModalDelete}
                closeModal={closeModalDelete}
                delete={deleteInfo}
                nameButton='Удалить'
            >
                <h1>
                    ВЫ ТОЧНО ХОТИТЕ УДАЛИТЬ ЭЛЕМЕНТ?
                </h1>
            </ModalDelet>
            <ModalEdit
                open={modalEdit}
                closeModal={closeModalEdit}
                element={element}
                save={save}
                checked={checked}
            >
                <div>
                    Дата
                    <input
                    className="modal-input"
                    type="text"
                    value={data}
                    onChange={e => setData(e.target.value)}
                     />
                </div>
                <div>
                    Время
                    <input
                    className="modal-input"
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    />
                </div>
                <div>
                    Источник
                    <input
                        className="modal-input"
                        type="text"
                        value={sourceEdit}
                        onChange={e => setSourceEdit(e.target.value)}
                    />
                </div>
                <div>
                    Фаза <input className="modal-input" type="text" value={element.d}/>
                </div>
                <div>
                    U, kB <input className="modal-input" type="text" value={element.e}/>
                </div>
                <div>
                    I, A <input className="modal-input" type="text" value={element.f}/>
                </div>
                <div>
                    P, MBt <input className="modal-input" type="text" value={element.a}/>
                </div>
                <div>
                    Q, Mвар <input className="modal-input" type="text" value={element.u}/>
                </div>
                <div>
                    cos φ <input className="modal-input" type="text" value={element.l}/>
                </div>

            </ModalEdit>
        </div>
    )
}