import Card from "../UI/Card";
import styles from './AddUser.module.css';
import Button from "../UI/Button";
import {useRef, useState} from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState('');

    const errorHandler = () => {
        setError(null);
    };

    const addUserHandler = (event) => {
        event.preventDefault();
        const inputName = nameInputRef.current.value;
        const inputAge = ageInputRef.current.value;
        if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter name and age'
            });
            return;
        }
        if (+inputAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Age must be more than zero'
            });
            return;
        }
        props.onAddUser(inputName, inputAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    return (
        <>
            {error && <ErrorModal
                title={error.title}
                message={error.message}
                onConfirm={errorHandler}
            />}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor={"username"}>Username</label>
                    <input
                        id={"username"}
                        type={"text"}
                        ref={nameInputRef}
                    />
                    <label htmlFor={"age"}>Age (Years)</label>
                    <input
                        id={"age"}
                        type={"number"}
                        ref={ageInputRef}
                    />
                    <Button type={"submit"}>Add User</Button>
                </form>
            </Card>
        </>
    );
}

export default AddUser;
