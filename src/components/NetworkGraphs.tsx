// src/components/NetworkGraphs.tsx
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface Node {
  id: string;
  group: string;
}

interface Link {
  source: string;
  target: string;
}

interface NetworkGraphProps {
  data: Array<{
    family?: string;
    genus?: string;
    species?: string;
  }>;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  // Build nodes and links from taxonomy relationships
  const nodesMap: Record<string, Node> = {};
  const links: Link[] = [];

  data.forEach(item => {
    const { family, genus, species } = item;

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

  const colorMap = {
    'Family': '#e74c3c',    // red
    'Genus': '#3498db',     // blue
    'Species': '#2ecc71'    // green
  };

  return (
    <div style={{ width: '100%', height: '600px', background: '#f8f9fa' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel="id"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const label = node.id;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

          ctx.fillStyle = colorMap[node.group as keyof typeof colorMap];
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default NetworkGraph;
