import { CourseParts } from "../types";

const Part = ({part} : {part : CourseParts} ) => {
    const assertNever = (value: never): never => {
        throw new Error(`Error ${value} is not valid`)
      }
    return (
        <div>
            <b>{part.name} {part.exerciseCount}<br /></b>
            {(()=> {
                switch(part.kind) {
                    case ('basic'):
                        return <i>{part.description}<br /><br /></i>
                    case ('group'): 
                        return <>project exercises {part.groupProjectCount}<br /><br /></>
                    case ('background'):
                        return <>{part.backgroundMaterial}<br /><i>{part.description}</i><br /><br /></>
                    case ('special'):
                        return <>
                            <i>{part.description}</i><br />
                            required skills: {part.requirements.map(req => 
                            <> {req} </>)}
                        <br /><br /></>
                    default:
                        return assertNever(part);
                }
            })()}
        </div>
    );
};

export default Part;