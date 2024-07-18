import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function SearchBox(props) {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const {pageNumber, keyword: urlKeyword} = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('')
            navigate(`search/${keyword}`);
        } else {
            navigate(`/`);
        }
    };

    return (
        <Form onSubmit={submitHandler} className={'d-flex'}>
            <FormControl
                type="text"
                name="q"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-2 ml-sm-5"/>
            <Button type="submit" variant="outline-light" className="p-2 mx-2">Search</Button>
        </Form>
    );
}

export default SearchBox;