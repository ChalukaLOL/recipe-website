import React from 'react';
import { Button } from '@mui/material'; // หากใช้ Material UI
import EditIcon from '@mui/icons-material/Edit'; // หากใช้ Material UI Icons

function EditRecipeButton({ recipeId, onEdit }) {
  const handleClick = () => {
    onEdit(recipeId);
  };

  return (
    <Button
      variant="outlined" // หรือ "contained"
      color="primary"
      size="small"
      onClick={handleClick}
      startIcon={<EditIcon />} // หากใช้ Material UI Icons
    >
      แก้ไข
    </Button>
  );
}

export default EditRecipeButton;