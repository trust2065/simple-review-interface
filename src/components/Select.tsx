import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import type { ReactElement } from 'react';
import React, { useContext } from 'react';

import ReviewContext from '../reviewContext';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function UserSelect(): ReactElement {
    const classes = useStyles();
    const store = useContext(ReviewContext);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                    Select User
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={store.selectedUser ?? ''}
                    onChange={e =>
                        store.setSelectedUser(e.target.value as string)
                    }
                >
                    {store.users?.map(user => (
                        <MenuItem value={user.id} key={user.id}>
                            {user.firstName} {user.lastName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
