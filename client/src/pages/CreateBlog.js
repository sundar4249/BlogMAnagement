import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const nagivate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })
    //input Change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // form submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            const { data } = await axios.post(`http://localhost:8800/api/v1/blog/create-blog`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            if (data?.success) {
                alert('Post Created')
                nagivate('/my-posts')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={'50%'} border={3} borderRadius={10} padding={3} margin={'auto'}
                    boxShadow={'10px 10px 20px #ccc'} display='flex' flexDirection={'column'} marginTop={2}>
                    <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={2} color={'greenyellow'}>
                        Create post
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '22px', fontWeight: 'bold' }}>Title
                    </InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '22px', fontWeight: 'bold' }}>Description
                    </InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 1, mt: 1, fontSize: '22px', fontWeight: 'bold' }}>Image URL
                    </InputLabel>
                    <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required />
                    <Button type='submit' color='primary' variant='contained'>SUBMIT</Button>
                </Box>

            </form>
        </>
    )
}

export default CreateBlog