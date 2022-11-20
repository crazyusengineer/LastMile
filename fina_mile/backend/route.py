import numpy as np
import json

ROW = 10
COL = 10
BLOCK_NUM = 5
TIME = 0
MONEY = 1


class Graph:
    """
    Class Graph have number of vertices and edges
    """

    def __init__(self, vertices):
        self.V = vertices  # No. of vertices
        self.graph = []

    # function to add an edge to graph
    def addEdge(self, u, v, w):
        self.graph.append([u, v, w])

    # utility function used to print the solution
    def printArr(self, dist):
        print("Vertex Distance from Source")
        for i in range(self.V):
            print("{0}\t\t{1}".format(i, dist[i]))

    def BellmanFord(self, src, dest):

        # Step 1: Initialize distances from src to all other vertices
        # as INFINITE
        dist = [float("Inf")] * self.V
        dist[src] = 0
        pred = [None] * self.V

        # Step 2: Relax all edges |V| - 1 times. A simple shortest
        # path from src to any other vertex can have at-most |V| - 1
        # edges
        for _ in range(self.V - 1):
            # Update dist value and parent index of the adjacent vertices of
            # the picked vertex. Consider only those vertices which are still in
            # queue
            for u, v, w in self.graph:
                if dist[u] != float("Inf") and dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    pred[v] = u

        # Step 3: check for negative-weight cycles. The above step
        # guarantees shortest distances if graph doesn't contain
        # negative weight cycle. If we get a shorter path, then there
        # is a cycle.

        for u, v, w in self.graph:
            if dist[u] != float("Inf") and dist[u] + w < dist[v]:
                print("Graph contains negative weight cycle")
                return

        # print all distance
        self.printArr(dist)
        path = []
        current = dest
        while current:
            path.append(current)
            print(current)
            current = pred[current]
        path = path[::-1]
        if src not in path:
            path.insert(0, src)
        return dist[dest], path


def init_cost_arr(row, col):
    """
    Initialize cost arrays
    paras:
        ROW: number of rows of the array
        COL: number of columns of the array
    return:
        money array and time array
    """

    money_arr = np.random.randint(0, 10, [row, col])
    time_arr = np.random.randint(0, 5, [row, col])
    return money_arr, time_arr


def combine_arr(money_arr, time_arr):
    """
    combine cost arrays
    paras:
        money_arr: money cost array (x,y)
        time_arr: time cost array (x,y)
    return:
        combined array (x,y)
    """

    comb_arr = []
    number_of_rows = len(money_arr)
    number_of_cols = len(money_arr[0])
    for i in range(number_of_rows):
        row = [0] * number_of_cols
        for j in range(number_of_cols):
            row[j] = [money_arr[i][j], time_arr[i][j]]
        comb_arr.append(row)
    return comb_arr


def generate_blocks(num, comb_arr):
    """
    Generate obstacles in the given array
    paras:
        num: number of obstacles to generate
        comb_arr: the combined array of time & money cost

    return:
        a comb_arr with obstacles in it ([-1, -1])
    """
    rand_x = []
    rand_y = []
    # Randomly generate X pair of coordinates to create block
    for i in range(num):
        rand_x.append(np.random.randint(0, 9))
        rand_y.append(np.random.randint(0, 9))
    # Set the coordinate points as -1,-1, meaning not available
    for j in range(num):
        comb_arr[rand_x[j]][rand_y[j]] = [-1, -1]
    return comb_arr


def get_availability(comb_arr, row, col):
    """
    Generate an array with available points.
    paras:
        comb_arr: the combined array of time & money cost
        row: row size of the comb_arr
        col: column size of the comb_arr
    return:
        The total number of vertex, and available points with id
    """
    ttl_vertex = 0
    accessible_vertex_coordinate = []
    accessible_vertex_id = []
    counter = 0
    for i in range(row):
        for j in range(col):
            if comb_arr[i][j] != [-1, -1]:
                ttl_vertex += 1
                accessible_vertex_coordinate.append([i, j])
                accessible_vertex_id.append(counter)
            counter += 1
    return ttl_vertex, accessible_vertex_id


def generate_edges(accessible_vertex, g, comb_arr, preference, r_len):
    """
    r_len for row length, (e.g. 13 * 9, r_len = 13)
    size of the array should be given in previous functions
    paras:
        accessible_vertex: list of id of vertex that are available
        g: the groph
        comb
    return:
        None
    """
    # preference = 0, time preferred
    # preference = 1, money preferred
    for x in accessible_vertex:
        id = x
        up = id - r_len
        down = id + r_len
        right = id + 1
        left = id - 1
        if up in accessible_vertex:
            x = up // r_len
            y = up % r_len
            g.addEdge(id, up, comb_arr[x][y][preference])
            # print("edge added")
        if down in accessible_vertex:
            x = down // r_len
            y = down % r_len
            g.addEdge(id, down, comb_arr[x][y][preference])
            # print("edge added")
        if right in accessible_vertex:
            if id % r_len != r_len - 1:
                x = right // r_len
                y = right % r_len
                g.addEdge(id, right, comb_arr[x][y][preference])
                # print("edge added")
        if left in accessible_vertex:
            if id % r_len != r_len:
                x = left // r_len
                y = left % r_len
                g.addEdge(id, left, comb_arr[x][y][preference])
                # print("edge added")


if __name__ == '__main__':
    # preference should be changeable, using enumeration
    preference = TIME
    m_arr, t_arr = init_cost_arr(ROW, COL)
    c_arr = combine_arr(m_arr, t_arr)
    generate_blocks(BLOCK_NUM, c_arr)
    ttl_vertex, availability = get_availability(c_arr, ROW, COL)
    graph = Graph(ROW * COL)
    generate_edges(availability, graph, c_arr, preference, ROW)
    print(graph.BellmanFord(85, 1))


# time cost & money cost
