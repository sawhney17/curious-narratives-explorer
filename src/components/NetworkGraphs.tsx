
// src/components/NetworkGraph.js
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const NetworkGraph = ({ data }) => {
  // Build nodes and links from taxonomy relationships
  const nodesMap = {};
  const links = [];

  data.forEach(item => {
    const family = item.family;
    const genus = item.genus;
    const species = item.species;

    if (family && !nodesMap[family]) {
      nodesMap[family] = { id: family, group: 'Family' };
    }
    if (genus && !nodesMap[genus]) {
      nodesMap[genus] = { id: genus, group: 'Genus' };
    }
    if (species && !nodesMap[species]) {
      nodesMap[species] = { id: species, group: 'Species' };
    }

    // Create taxonomic relationships
    if (family && genus) {
      links.push({ source: genus, target: family });
    }
    if (genus && species) {
      links.push({ source: species, target: genus });
    }
  });

  const graphData = {
    nodes: Object.values(nodesMap),
    links: links,
  };

  // Color nodes by taxonomic level
  const colorMap = {
    'Family': '#e74c3c',    // red
    'Genus': '#3498db',     // blue
    'Species': '#2ecc71'    // green
  };

  return (
    <div style={{ width: '800px', height: '600px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const label = node.id as string;
          const fontSize = 12 / globalScale;
          const nodeColor = colorMap[node.group as keyof typeof colorMap] || 'gray';
          
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, 5, 0, 2 * Math.PI, false);
          ctx.fill();
          
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.fillText(label, (node.x || 0) + 6, (node.y || 0) + 6);
        }}
      />
    </div>
  );
};

export default NetworkGraph;
