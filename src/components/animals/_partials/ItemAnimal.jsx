import React from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Divider, IconButton, Tooltip} from "@material-ui/core";
import {Delete, Edit, Photo} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import {asset} from "../../../config/config";
import {ANIMAL_EDIT, toName} from "../../../config/urls";
import {Link} from "react-router-dom";

const ItemAnimal = ({animal, onDelete}) => {

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={asset(animal.img)} />
                </ListItemAvatar>
                <ListItemText
                    primary={animal.name}
                    secondary={animal.science_name}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                                onClick={onDelete}
                                className={'color-red'}>
                        <Delete />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete"
                                component={Link}
                                to={toName(ANIMAL_EDIT, {id: animal.id})}
                                className={'color-info'}>
                        <Edit />
                    </IconButton>
                    <Tooltip title={'Ver fotografía'}>
                        <IconButton href={asset(animal.img)}
                                    target={'_blank'}
                                    size={"small"}
                                    className={'secondary'}
                                    aria-label="Ver imagen">
                            <Photo />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ItemAnimal;
