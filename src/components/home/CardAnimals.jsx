import React from 'react';
import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import {asset} from "../../config/config";
const CardAnimal = ({ animal }) => {

    return (

        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        {animal.name.toString().slice(0, 1)}
                    </Avatar>
                }
                title={animal.name}
                subheader={animal.science_name}
            />

            <CardMedia
                style={{height: 170}}
                image={asset(animal.img)}
                title={animal.name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >
                    { animal.description }
                </Typography>
            </CardContent>

            {/*<CardActions>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Leer más*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
};

CardAnimal.propTypes = {
    animal: PropTypes.object.isRequired
};

export default CardAnimal;
