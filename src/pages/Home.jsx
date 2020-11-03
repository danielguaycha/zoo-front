import React, {useEffect, useState} from 'react';
import {Button, Container, Grid} from "@material-ui/core";
import CardAnimal from "../components/home/CardAnimals";
import Nav from "../components/home/Nav";
import Alert from "../components/_partials/Alert";
import Axios from "axios";
import {toast} from "react-toastify";
import {processErrors} from "../utils/utils";
import WithLoader from "../components/_partials/hoc/WithLoader";

const Home = () => {
    // data
    const [animals, setAnimals] = useState([]);

    const [loader, setLoader] = useState(true);
    const [filters, setFilters] = useState({
        limit: 12,
        search: '',
        page: 1,
        count: 0
    });

    // getting animals
    useEffect(() => {
        const getAnimals = () => {
            let url = `/animals?limit=${filters.limit}&page=${filters.page}`;
            if (filters.search) {
                url+=`&search=${filters.search}`;
            }
            setLoader(true);
            Axios.get(url).then(res => {
                if(res.ok) {
                    res.data.forEach(el => {
                        setAnimals(animals => animals.concat(el))
                    })
                    filters.count = res.total;
                }
            })
                .catch(err => toast.error(processErrors(err)))
                .finally(() => setLoader(false))
        };
        getAnimals();
    }, [filters]);

    // getting more
    const getMore = () => {
        setFilters({...filters, page: filters.page+1})
        setTimeout(() => {
            window.scrollTo(0,document.body.scrollHeight + 100);
        }, 200)
    };

    const search = (query) => {
        setLoader(true);
        setAnimals([]);
        setFilters({...filters, search: query, page: 1, count: 0});
    }

    // render template
    return (
        <div className={'content-home'}>
            <Nav onSearch={(q) => search(q)} />
            <Container maxWidth="md" >
                {/*<WithLoader loader={loader} elevation={0} text={'Obteniendo información del Zoológico'}>*/}
                    <Grid container spacing={2}>
                        {
                            animals.map(a => {
                                return <Grid item xs={12} md={3} lg={4} key={a.id}>
                                    <CardAnimal animal={a} />
                                </Grid>
                            })
                        }
                        {
                            animals.length <= 0 && !loader && <Grid item xs={12}>
                                <Alert show className={'text-muted'} message={'No hay animales para mostrar'} />
                            </Grid>
                        }

                            <Grid item xs={12} className={'center'}>
                                <WithLoader loader={loader} elevation={0}>
                                {
                                    animals.length > 0 && filters.search === '' && filters.count > animals.length &&
                                        <Button onClick={()=>getMore()} variant={"contained"} color={'primary'}>Ver más</Button>
                                }
                                </WithLoader>
                            </Grid>

                    </Grid>
                {/*</WithLoader>*/}

            </Container>
        </div>
    );
};

export default Home;
