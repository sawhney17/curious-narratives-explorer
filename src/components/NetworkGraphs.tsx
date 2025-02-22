// src/components/NetworkGraph.js
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const NetworkGraph = ({ data }) => {
  // Build nodes and links from data
  const nodesMap = {};
  const links = [];

  data.forEach(item => {
    const runaway = item['Name of Runaway'];
    const owner = item['Owner of Runaway'];
    const apprehender = item['Apprehender'];

    if (runaway && !nodesMap[runaway]) {
      nodesMap[runaway] = { id: runaway, group: 'Runaway' };
    }
    if (owner && !nodesMap[owner]) {
      nodesMap[owner] = { id: owner, group: 'Owner' };
    }
    if (apprehender && !nodesMap[apprehender]) {
      nodesMap[apprehender] = { id: apprehender, group: 'Apprehender' };
    }
    if (runaway && owner) {
      links.push({ source: runaway, target: owner });
    }
    if (runaway && apprehender) {
      links.push({ source: runaway, target: apprehender });
    }
  });

  const graphData = {
    nodes: Object.values(nodesMap),
    links: links,
  };

  // Optional: color nodes by group
  const colorMap = {
    'Runaway': '#e74c3c',      // red
    'Owner': '#3498db',        // blue
    'Apprehender': '#2ecc71'   // green
  };

  return (
    <div style={{ width: '800px', height: '600px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          const nodeColor = colorMap[node.group] || 'gray';
          // Draw node as circle
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fill();
          // Draw node label
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = 'black';
          ctx.fillText(label, node.x + 6, node.y + 6);
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
      />
    </div>
  );
};

export default NetworkGraph;