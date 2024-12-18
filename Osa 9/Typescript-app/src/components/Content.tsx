import { CourseParts } from '../types';
import Part from './Part';

  const Content = ({ parts }: {parts: CourseParts[]})  => {
    return (
    <div> 
        {parts.map((part) => (
            <Part key={part.name} part={part}/>
        ))} 
    </div>
    );
  };

export default Content;