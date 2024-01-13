import React from "react";
import '../../styles/ContextMenu.css';

export default function ContextMenu() {
    return (
        <ul className="context-menu__list">
            <li className="context-menu__list--item">Завершить</li>
            <li className="context-menu__list--item">Изменить название</li>
            <li className="context-menu__list--item">Изменить описание</li>
        </ul>
    )
}