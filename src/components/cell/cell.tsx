import { FC } from 'react';
import './cell.scss'
import { Cell } from '../../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComp: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div className={
      [
        'board__cell',
        cell.color,
        selected ? 'board__cell-selected' : '',
        (cell.available && cell.figure ? 'board__cell-enemy' : '')
      ].join(' ')}
      onClick={() => click(cell)}
    >
      {cell.available && !cell.figure && <div className={'board__cell-available'} />}
      {cell.figure?.logo
        && <img
          src={cell.figure.logo}
          className='board__cell-img'
          alt='Figure'
        />}
    </div>
  )
}

export default CellComp;
