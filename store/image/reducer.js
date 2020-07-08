import { ADD_IMAGE, EMPTY_IMAGE, FILTER_IMAGE } from './action';
import Image from '../../models/image';

const initialState = {
  images: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPTY_IMAGE:
      return {
        images: [],
      }
    case FILTER_IMAGE: {
      let myArray = state.images.filter(function (el) {
        return action.images.image.indexOf(el.id) < 0;
      })
      for (var i = 0; i < myArray.length; i++) {
        myArray[i].id = i;
      }
      return {
        images: myArray,
      }
    }
    case ADD_IMAGE:
      const newImage = new Image(action.imageData.id, action.imageData.image);
      return {
        images: state.images.concat(newImage),
      }
    default:
      return state;
  }
}