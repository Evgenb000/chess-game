import React, {FC} from 'react';
import { Figure } from "../../models/figures/Figure";
import './lost.scss';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className="lost">
      <h3 className='lost__title'>{title}</h3>
      {figures.map(figure => 
        <div key={figure.id}>
          {figure.logo && <img width={16} height={16} src={figure.logo} alt='figure icon'></img>}
          {figure.name}

        </div>
      )}
    </div>
  )
}

export default LostFigures;