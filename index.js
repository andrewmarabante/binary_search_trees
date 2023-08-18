class Node
{
    constructor(data = null, left = null, right = null)
    {
        this.data = data;
        this.left = left;
        this.right = right
    }
}

class tree
{
    constructor(array = [null])
    {
        if(Array.isArray(array))
        {
            this.root = buildTree(array);
        }
        else{console.log('Not an Array')}
    }

}

function buildTree(array, start = 0, end = array.length-1)
{
    array = mergeSort(array);
    if (start>end){return null};
    let mid = Math.floor((start+end)/2);
    let root = new Node(array[mid]);
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

const newTree = new tree([34,546,2,3])
console.log(newTree)
prettyPrint(newTree.root)