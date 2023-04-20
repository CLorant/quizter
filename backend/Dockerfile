FROM node

COPY ./docker/entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# Copy or mount node app here
WORKDIR /data/

EXPOSE 2000

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD ["npm", "run dev"]