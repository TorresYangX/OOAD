# Front end: HTML and CSS

- annotations in html is <!-- 注释内容 -->
- Some explanations about tags above 
  1. caption : the title of table 
  1. tr : table row, could contain multiple  and  tag  
  1. th : table head, as you see Category is bold 
  1. td : table item
  1. border : a border around html element 
  1. cellpadding : The cellpadding attribute specifies the space, in pixels, between the cell wall and the cell content. 
  1. cellspacing : The cellspacing attribute specifies the space, in pixels, between cells. 
  1. bgcolor : The bgcolor attribute specifies a background color of a table.
- CSS selector:
  - \#a is an ID selector, which set the style for a tag with given id attribute. The #a selector in CSS corresponds with the id="a" attribute. 
- The HTML <form> element is used to create a HTML form. Form can contain the <input> element. E.g., the text box, the check box, the radio button, and the submit button, etc.  text are the text boxes, select is the drop down menu, option are the options under the drop down menu. button is the submit button.
- The aim of <div> element is to create divisions in the whole HTML document. It can be used for layout management, and do not need any special styles attached to it.



- JS:
  - The way we get the information entered by user is to use querySelector()
  - Document can be regarded as the root node of the html page, from which, we can acquire all sub-elements from the html page.
  - difference between getElementById and querySelector: getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。如果没有指定 ID 的元素返回 null; 如果存在多个指定 ID 的元素则返回第一个; 如果需要查找到那些没有 ID 的元素，你可以考虑通过CSS选择器使用 querySelector(); getElement(s)Byxxxx 获取的是动态集合，querySelector 获取的是静态集合动态就是选出的元素会随文档改变，静态的不会取出来之后就和文档的改变无关了。
- regular expression:
  - \d: Stands for digits (0-9) 
  - []: Stands for a character in given range 
  - {N}: Repeat the pattern for N times 
  - +: Appears no less than once 
  - ^: Start of a line 
  - $: End of a line
- onload attribute stands for the code that will be executed when loading the element