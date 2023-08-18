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
    constructor(array = null)
    {
        this.root = array;
    }

    buildTree(array)
    {

    }
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

const newTree = new tree(23)
console.log(mergeSort([21,56,34,98, 1]))