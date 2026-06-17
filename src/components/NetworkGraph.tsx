import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Agent } from '../types';

interface AgentLink {
  source: string | AgentNode;
  target: string | AgentNode;
  value: number;
}

interface AgentNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  role: string;
  status: string;
  activeTasks: number;
  layer: string;
}

interface NetworkGraphProps {
  nodes: Agent[];
  links: { source: string; target: string; value: number }[];
}

export function NetworkGraph({ nodes, links }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const width = dimensions.width;
    const height = dimensions.height;

    // Clear previous graph
    d3.select(containerRef.current).select('svg').remove();

    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    const graphNodes: AgentNode[] = nodes.map((d) => ({ ...d }));
    const graphLinks: AgentLink[] = links.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation<AgentNode>(graphNodes)
      .force('link', d3.forceLink<AgentNode, AgentLink>(graphLinks).id((d) => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(40));

    // Define arrow markers for links
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 22)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#475569')
      .style('stroke', 'none');

    const link = svg
      .append('g')
      .attr('stroke', '#475569')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(graphLinks)
      .join('line')
      .attr('stroke-width', (d) => Math.max(1, d.value))
      .attr('marker-end', 'url(#arrowhead)');

    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(graphNodes)
      .join('g')
      .call(
        d3
          .drag<SVGGElement, AgentNode>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    nodeGroup
      .append('circle')
      .attr('r', 16)
      .attr('fill', (d) => {
        if (d.status === 'running') return '#10b981'; // emerald-500
        if (d.status === 'error') return '#f43f5e'; // rose-500
        if (d.status === 'recovering') return '#f59e0b'; // amber-500
        return '#64748b'; // slate-500
      })
      .attr('stroke', '#1e293b') // slate-800
      .attr('stroke-width', 3);

    nodeGroup
      .append('text')
      .text((d) => d.name)
      .attr('x', 20)
      .attr('y', 4)
      .attr('fill', '#cbd5e1') // slate-300
      .attr('font-size', '10px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', '500')
      .style('pointer-events', 'none');

    // Tooltip implementation (simple title for now)
    nodeGroup.append('title').text((d) => `${d.name}\nRole: ${d.role}\nTasks: ${d.activeTasks}`);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as AgentNode).x!)
        .attr('y1', (d) => (d.source as AgentNode).y!)
        .attr('x2', (d) => (d.target as AgentNode).x!)
        .attr('y2', (d) => (d.target as AgentNode).y!);

      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: d3.D3DragEvent<SVGGElement, AgentNode, AgentNode>, d: AgentNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, AgentNode, AgentNode>, d: AgentNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, AgentNode, AgentNode>, d: AgentNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, links, dimensions]);

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" />;
}
