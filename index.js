class Node
{
    constructor(data = null, left = null, right = null)
    {
        console.log('wokring')
        this.data = data;
        this.left = left;
        this.right = right
    }
}

class tree
{
    constructor(array = null)
    {
        if(array!= null)
        {
            this.root = buildTree(array);
        }
        else{this.root = array}
    }

}

function buildTree(array, start = 0, end = array.length-1)
{
    array = mergeSort(array);
    if (start>end){return null};
    let mid = Math.floor((start+end)/2);
    let root = new Node(array[mid]);
    console.log(root)
    root.left = (buildTree(array,start,mid-1));
    root.right = (buildTree(array,mid+1,end));
    return root;
}

const mergeSort = (array) =>
{
    if (array.length === 0)
    {
        return ('invalid')
    }
    else if (array.length === 1)
    {
        return array;
    }
    else 
    {
        const left = array.slice(0,Math.floor(array.length/2));
        const right = array.slice(Math.floor(array.length/2), array.length);
        return merge(mergeSort(left), mergeSort(right))     
    }
}

function merge(left, right)
{
    const merge =[];
    let li = 0;
    let ri = 0;
    while(left.length > li && right.length > ri)
    {
        if (left[li] < right[ri])
        {
            merge.push(left[li])
            li++
        }
        else
        {
            merge.push(right[ri])
            ri++
        }
    }
    while(left.length > li)
    {
        merge.push(left[li])
        li++
    }
    while(right.length > ri)
    {
        merge.push(right[ri])
        ri++
    }

    return merge;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const newTree = new tree([23,12,34,15,54,67,8,2,1,5,89,45,6,31])
console.log(newTree)
console.log(prettyPrint(newTree.root))