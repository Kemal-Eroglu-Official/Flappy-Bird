class Matrix {
     constructor (rows, columns) {
          this.data = [];
          this.row_quantity = rows;
          this.column_quantity = columns;

          for (let i = 0; i < rows; i++) {
               let row_ = [];
               for (let j = 0; j < columns; j++) {
                    row_.push();
               }
               this.data.push(row_);
          }
     }

     getMatrix () {
          return this.data;
     }

     getValue (row_index, column_index) {
          if (!this.inMatrix(row_index, column_index)) {
               return;
          }

          row_index--;
          column_index--;

          let row_data = this.data[row_index];
          return row_data[column_index];
     }

     getRow (row_index) {
          if (!this.inMatrix(row_index, 1)) {
               return;
          }

          row_index--;
          return this.data[row_index];
     }

     getColumn (column_index) {
          if (!this.inMatrix(1, column_index)) {
               return;
          }
          column_index--;
          let column_ = []
          for (let i = 0; i < this.data.length; i++) {
               let row_ = this.data[i];
               column_.push(row_[column_index]);
          }
          return column_;
     }

     getRowLength () {
          return this.row_quantity;
     }

     getColumnLength () {
          return this.column_quantity;
     }

     setRow (row_, row_index) {
          if (row_ instanceof Array) {
               if (row_.length == this.column_quantity) {
                    for (let i = 0; i < row_.length; i++) {
                         this.setValue(row_[i], row_index, i + 1);
                    }
                    return true;
               }
               
          }
          return false;
     }

     setColumn (column_set, column_index) {
          if (column_set instanceof Array) {
               if (column_set.length == this.row_quantity) {
                    for (let i = 0; i < this.row_quantity; i++) {
                        this.setValue(column_set[i], i + 1, column_index);
                    }
                    return true;
               }
          }
          return false;
     }

     setValue (value, row_index, column_index) {
          let row_set = this.getRow(row_index);
          row_set[column_index - 1] = value;
          this.data[row_index - 1] = row_set;
     }

     inMatrix (row, column) {
          let cond1 = (row <= this.row_quantity) ? true : false;
          let cond2 = (column <= this.column_quantity) ? true : false;
          let cond3 = (0 < row) ? true : false;
          let cond4 = (0 < column) ? true : false;

          if (cond1 && cond2 && cond3 && cond4) {
               return true;
          }
          else {
               return false;
          }
     }

     addition (secondMatrix) {
          if (secondMatrix instanceof Matrix) {
               let cond1 = (this.row_quantity == secondMatrix.row_quantity); 
               let cond2 = (this.column_quantity == secondMatrix.column_quantity); 

               if (cond1 && cond2) {
                    for (let i = 1; i <= this.row_quantity; i++) {
                         for (let j = 1; j <= this.row_quantity; j++) {
                              let value = this.getValue(i, j) + secondMatrix.getValue(i, j);
                              this.setValue(value, i, j);
                         }
                    }
                    return true;
               }
          }
          return false;
     }

     scalerMultiplication (multiplier) {
          let matrix_ = new Matrix(this.row_quantity, this.row_quantity)
          
          for (let i = 1; i <= this.row_quantity; i++) {
               for (let j = 1; j <= this.row_quantity; j++) {
                    let value = this.getValue(i, j) * multiplier;
                    if (value == -0) {
                         value = 0;
                    }
                    matrix_.setValue(value, i, j);
               }
          }

          return matrix_;
     }

     transpose () {
          let row_q    = this.column_quantity;
          let column_q = this.row_quantity;
          let matrix_ = new Matrix(row_q, column_q);

          for (let i = 0; i < this.row_quantity; i++) {
               let col_ = this.getRow(i + 1);
               matrix_.setColumn(col_, i + 1);
          }

          return matrix_;
     }

     multiplication (secondMatrix) {

          if (secondMatrix instanceof Matrix) {
               if (this.column_quantity == secondMatrix.row_quantity) {

                    let current_matrix = new Matrix(this.row_quantity, secondMatrix.column_quantity);
                    
                    for (let i = 1; i <= current_matrix.row_quantity; i++) {
                         
                         let row_set = this.getRow(i);
                         
                         for (let j = 1; j <= current_matrix.column_quantity; j++) {

                              let column_set = secondMatrix.getColumn(j);
                              let value = 0;

                              for (let c = 0; c < this.column_quantity; c++) {
                                   value += row_set[c] * column_set[c];
                              }

                              current_matrix.setValue(value, i, j);
                         }
                    }
                    return current_matrix;
               }
          }
          return false;
     }

     printMatrix () {
          for (let i = 0; i < this.row_quantity; i++) {
               console.log(this.getRow(i + 1));
          }
          console.log("-------------------");
     }
}

function randomNumber (min, max) {
     let number = Math.random();
     number *= 10;
     
     while (true) {
          if (number < min) {
               number *= 10;
          }

          if (min <= number && number < max) {
               return Math.floor(number);
          }
     }
}

function fillWithRandom (matrix, min, max) {
     for (let i = 0; i < matrix.getRowLength(); i++) {
          for (let j = 0; j < matrix.getColumnLength(); j++) {
               matrix.setValue(randomNumber(min, max), i + 1, j + 1); 
          }
     }
}