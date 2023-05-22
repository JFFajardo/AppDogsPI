const validate = (input) => {
    const error={}

    if (!input.name) error.name = "Write the name";
    else if (input.name.length > 30) error.name = "Maximum number of characters: 30"
  
    if (!input.height_min) error.height_min = 'Write the min height'
    else if (input.height_min < 1) error.height_min = "Should be taller than 1cm";
    else if (isNaN(input.height_min)) error.height_min = "Should be a number";
  
    if (!input.height_max) error.height_max = 'Write the max height'
    else if (input.height_max > 200) error.height_max = "Should be smaller than 200cm";
    else if (isNaN(input.height_max)) error.height_max = "Should be a number";
  
    if (input.height_min && input.height_max && parseInt(input.height_min) >= parseInt(input.height_max)) error.height_max = 'Max height should be bigger than min'
  
    if (!input.weight_min) error.weight_min = "Write the min weight";
    else if (input.weight_min < 1) error.weight_min = "Should be heavier than 1kg";
    else if (isNaN(input.weight_min)) error.weight_min = "Should be a number";
    
    if (!input.weight_max) error.weight_max = "Write the max weight";
    else if (input.weight_max > 100) error.weight_max = "Should be less heavy than 100kg";
    else if (isNaN(input.weight_max)) error.weight_max = "Should be a number";
    
    if (input.weight_min && input.weight_max && parseInt(input.weight_min) >= parseInt(input.weight_max)) error.weight_max = 'Max weight should be bigger than min'
  
    if (input.life_span_min && input.life_span_min < 1) error.life_span_min = "Min life span should be bigger than 1 year";
    else if (input.life_span_min && isNaN(input.life_span_min)) error.life_span_min = "Should be a number";
  
    if (input.life_span_max && input.life_span_max > 30) error.life_span_max = "Max life span should be smaller than 30 years";
    else if (input.life_span_max && isNaN(input.life_span_max)) error.life_span_max = "Should be a number";
  
    if (input.life_span_min && !input.life_span_max) error.life_span_min = 'Both life spans should be filled'
    if (!input.life_span_min && input.life_span_max) error.life_span_max = 'Both life spans should be filled'
    
    if (input.life_span_min && input.life_span_max && parseInt(input.life_span_min) >= parseInt(input.life_span_max)) error.life_span_max = 'Max life span should be bigger than min'
  
return error
}

export default validate