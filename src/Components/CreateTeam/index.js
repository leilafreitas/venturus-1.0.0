import React,{useEffect, useState} from 'react';
import api from '../../Helper/Api';
import { Camp } from '../Camp';
import { Card } from '../CardPlayer';
import { Container,
     Header,
     Title,
     TextArea,
     InputText,
     Box,
     Content,
     FormItem,
     SubTitle,
     CampContainer,
    RadioGroup,
    BoxPlayers,
    Select,
    SaveBtn} from './styled';
import * as yup from 'yup';

import {timeSchema} from '../../Helper/Validation';

let searchTimer = null;
    
export const CreateTeam = () =>{
    const [checkBox,setCheckBox] = useState("");
    const [players, setPlayers] = useState([]);
    const [playersSelecteds,setPlayersSelected] = useState([]);
    const [tags,setTags] = useState([]);
    const [name, setName] = useState("");
    const [description,setDescription] = useState("");
    const [site,setSite] = useState("");
    const [formation,setFormation] = useState(0);
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState('');

    useEffect(()=>{
        clearTimeout(searchTimer);
        searchTimer = setTimeout(()=>{
            setActiveSearch(search);
        },2000)
    },[search]);
    
    useEffect(()=>{

        getPlayers();
            
    },[activeSearch]);


    const getPlayers=async()=>{
        const list = await api.getPlayers(activeSearch);
        setPlayers(list);
        console.log(list);
    }

    const handleChange = (event) => {
        setCheckBox(event.target.value);
    };

    const handleChangeFormation= (event) => {
        console.log(event.target.value);
        setFormation(event.target.value);
    };

    const handleSave = () =>{
        const time= {
            name:name,
            description:description,
            type:checkBox,
            site:site,
            players:playersSelecteds,
            tags:tags,
            formation:formation
        }
        timeSchema.isValid(time).then(value=>{
            if(value){
                api.postTime(time);
            }else{

            }
        
        })
    }

    const setPlayerCard = () =>{
        return <BoxPlayers>
            {
                players.map((item,key)=>{
                    return <Card data={item} key={key}/>
                })
            }
        </BoxPlayers>
    }


    return <Container>
        <Header>Create your team</Header>
        <Title>TEAM INFORMATION</Title>
        <Content>
            <Box side="left">
                <FormItem row="1">
                    <SubTitle>
                        Team name
                    </SubTitle>
                    <InputText placeholder="Insert team name" onChange={(e)=>setName(e.target.value)}/>
                </FormItem>

                <FormItem row="2">
                    <SubTitle>
                        Description
                    </SubTitle>
                    <TextArea onChange={(e)=>setDescription(e.target.value)}/>
                </FormItem>
            </Box>

            <Box>
                <FormItem row="1">
                    <SubTitle>
                        Team website
                    </SubTitle>
                    <InputText placeholder="www.myteam.com" onChange={(e)=>setSite(e.target.value)}/>
                </FormItem>

                <FormItem row="2">
                    <SubTitle>
                        Team type
                    </SubTitle>
                    <RadioGroup>
                        <input
                                type='radio'
                                checked={checkBox === 'Real'}
                                value="Real"
                                onChange={handleChange}
                        /><label>Real</label>
                        <input
                            type='radio'
                            checked={checkBox === 'Fantasy'}
                            value="Fantasy"
                            onChange={handleChange}
                        /><label>Fantasy</label>
                    </RadioGroup>
                </FormItem>

                <FormItem row="3">
                    <SubTitle>
                        Tags
                    </SubTitle>
                    <TextArea/>
                </FormItem>

            </Box>
                        
        </Content>

        <Title>CONFIGURE SQUAD</Title>
        <Content>
            <CampContainer>
                <SubTitle>Formation</SubTitle>
                <Select defaultValue={0} onChange={handleChangeFormation}>
                    <option value={0}>3-2-2-3</option>
                    <option value={1}>3-2-3-1</option>
                    <option value={2}>3-4-3</option>
                    <option value={3}>3-5-2</option>
                    <option value={4}>4-2-3-1</option>
                    <option value={5}>4-3-1-1</option>
                    <option value={6}>4-3-2</option>
                    <option value={7}>4-4-2</option>
                    <option value={8}>4-5-1</option>
                    <option value={9}>5-4-1</option>
                </Select>
                <Camp formation={formation}/>
                <SaveBtn onClick={()=>handleSave()}>Save</SaveBtn>
            </CampContainer>
            <Box>
                <FormItem row="1">
                    <SubTitle>
                        Search Players
                    </SubTitle>
                    <InputText placeholder="" onChange={(e)=>setSearch(e.target.value)}/>
                </FormItem>
                <FormItem row="2/4">
                    {setPlayerCard()}
                </FormItem>
            </Box>
        </Content>
    </Container>
}