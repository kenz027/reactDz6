import { useRef } from "react";

export default function Form(props){
    const timeZoneRef = useRef();
    const nameRef = useRef();
    const formSubmitHandler = (e) =>{
        e.preventDefault();
        const form = e.target;
        const timeZoneValue = timeZoneRef.current.value;
        const nameValue = nameRef.current.value;
        if (timeZoneRef && nameValue) props.onFormSubmit({nameValue, timeZoneValue});
        form.reset();
    }
    return (
        <form onSubmit={formSubmitHandler} className='form' autoComplete="off">
            <label>
                Название
                <input name='name' type='text' ref={nameRef} />
            </label>
            <label>
                Временная зона
                <input name='timezone' type='number' ref={timeZoneRef}/>
            </label>
            <button type='submit'>Добавить</button>
        </form>
    )
}