/*
Inputs: 
Height of bird
distance between bird and column (x value)
distance between the top of the bird and the column
the distance between the bottom of the bird and the column
*/

class Network {

     constructor (inputs, amountofneurons, hiddenlayer, outputs) {
          this.weights = [];
          this.weights[0] = new Matrix(amountofneurons, inputs);
          for (let i = 0; i < hiddenlayer; i++) {
               this.weights.push(new Matrix(amountofneurons, amountofneurons));
          }
          this.weights.push(new Matrix(outputs, amountofneurons));
     }

     feedforward() {

     }
      
}