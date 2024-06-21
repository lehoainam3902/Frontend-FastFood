import { Box, Button, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import CreateIngredientForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../componet/State/Ingredients/Action';
const orders=[1,1,1,1,1,1,1]
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function IngredientTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restaurant, ingredients} = useSelector((store) => store)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateStoke = (id) =>{
    dispatch(updateStockOfIngredient({id, jwt}));
  }
  useEffect(()=>{
    dispatch(
      getIngredientsOfRestaurant({jwt, id: restaurant.usersRestaurant.id})
    );
  }, []);
  return (
    <div>
        <Box>
            <Card className='mt-1'>
                <CardHeader action={
                    <IconButton onClick={handleOpen} aria-label="settings">
                        <CreateIcon />
                    </IconButton>
                }
                title={"Thành phần món ăn"}
                sx={{pt:2,alignItems:"center"}}
                />
                
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="left">ID</TableCell>
            <TableCell align="right">Tên</TableCell>
            <TableCell align="right">Danh mục thành phần</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.ingredients.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              
              <TableCell align="right">{item.category.name}</TableCell>
              <TableCell align="right">
                <Button onClick={()=>handleUpdateStoke(item.id)}>{item.inStoke?"còn hàng":"hết hàng"}</Button>
              </TableCell>
              
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Card>
            <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
     <CreateIngredientForm/>
  </Box>
</Modal>
        </Box>
    </div>
  )
}
